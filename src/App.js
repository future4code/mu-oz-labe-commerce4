import React from "react";
import styled from "styled-components"
import { products } from "./Products"

const AppContainer = styled.div`
display: grid;
grid-template-columns: 1fr 3fr 1fr;

`

export default class App extends React.Component {
  state = {
    carrinho: [],
    valorMin: 0,
    valorMax: 2000,
    valorNome: "prod"
  };

adicionarAoCarrinho = (product) => {
  const produtoNoCarrinho = this.state.carrinho.find((produtoNoCarrinho) => {
    if (produtoNoCarrinho.id === product.id) {
      return true;
    }
    return false;
  });

  if (!produtoNoCarrinho) {
    const novoProdutoNoCarrinho = {
      ...product,
      quantidade: 1
    };

/// aqui é o array copiado, que vai ser usado para adicionar no carrinho
const copiaDoCarrinho = [...this.state.carrinho, novoProdutoNoCarrinho];

this.setState({ carrinho: copiaDoCarrinho });
} else {
const copiaDoCarrinho = this.state.carrinho.map((produtoNoCarrinho) => {
  if (produtoNoCarrinho.id === product.id) {
    return {
      ...produtoNoCarrinho,
      quantidade: produtoNoCarrinho.quantidade + 1
    };
  } else {
    return produtoNoCarrinho;
  }
});
this.setState({ carrinho: copiaDoCarrinho });
}
};

// removerDoCarrinho = (productId) => {
//   const removed = this.state.carrinho.filter((product) => {
//     return productId !== product.id;
//   } )
  
//   this.setState({ product: itemsCarrinho} );
// }

  render() {
    //Aqui é o valor total do looping
    let valorTotal = 0;

    for (let produtoNoCarrinho of this.state.carrinho) {
      valorTotal += produtoNoCarrinho.value * produtoNoCarrinho.quantidade;
    }

    // Valor total do carrinho - reduce
    const valorTotalReduce = this.state.carrinho.reduce(
      (valorAcumulado, produtoNoCarrinho) => {
        const valorDoProduto =
          produtoNoCarrinho.value * produtoNoCarrinho.quantidade;

        return valorAcumulado + valorDoProduto;
      },
      0
    );

    // Aqui começam os filtros
    const listaFiltrada = products.filter((product) => {
        if (product.value >= this.state.valorMin) {
          return true;
        } else {
          return false;
        }
      })
      .filter((product) => {
        if (product.value <= this.state.valorMax) {
          return true;
        } else {
          return false;
        }
      })
      .filter((product) => {
        if (
          product.name
            .toLowerCase()
            .includes(this.state.valorNome.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });


    return (
      <AppContainer>
        <div>
          <h3>Produtos</h3>
          {listaFiltrada.map((product) => {
            return (
              <div>
                <img src={product.imageUrl} />
                <p>
                  {product.name} - R${product.value}
                </p>
                <button onClick={() => this.adicionarAoCarrinho(product)}>
                  Adicionar ao carrinho
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <h3>Carrinho</h3>
          {this.state.carrinho.map((product) => {
            return (
              <div>
                <p>
                  {product.name} - R${product.value * product.quantidade} -{" "}
                  {product.quantidade}x
                </p>
                <button onClick={() => this.removerDoCarrinho(products)}>Remover</button>
              </div>
            );
          })}
          <p>Valor total: R${valorTotalReduce}</p>
        </div>
      </AppContainer>
    );
  }
}