import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {  

  // Atributo para as coleções do Firestore 
  private productsCollection: AngularFirestoreCollection<Product>;

  // Declarando e passando o atributo para configuração e acesso aos módulos do Firestore
  constructor(private ngFirestore: AngularFirestore) {
    this.productsCollection = this.ngFirestore.collection<Product>("Products");
  }

  // Função para ler os produtos do storage
  getProducts() {
    return this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data};
        });
      })
    )
  }

  // Função para ler um produto do storage
  getProduct(id: string) {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

  // Função para adicionar um produto ao storage
  addProducts(product: Product) {
    return this.productsCollection.add(product);
  }

  // Função para alterar um produto do storage
  updateProduct(id: string, product: Product) {
    return this.productsCollection.doc<Product>(id).update(product);
  }

  // Função para deletar um produto do storage
  deleteProduct(id: string) {
    return this.productsCollection.doc<Product>(id).delete();
  }
}
