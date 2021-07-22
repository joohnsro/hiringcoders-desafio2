import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as S from './styled';

export default function Product(props: any) {

    const [product, setProduct] = useState(props.currentProduct);

    function handleProductInput(e: any): void {
        const id: string = e.target.getAttribute('id');
        const value: string = e.target.value;

        let input:object = { [id]: value, };

        setProduct({ ...product, ...input });
    }

    function handleSubmit(e: any): void {
        e.preventDefault();

        props.onSubmitProduct({
            ...product,
            id: product.id !== '' ? product.id : uuidv4(),
        });
    }

    function handleNewProduct(): void {
        setProduct({id: uuidv4(), category: ''});
    }

    useEffect(() => {
        setProduct(props.currentProduct);
    }, [props.currentProduct]);

    const categories = [
        {id: 'books', name: 'Livros'},
        {id: 'courses', name: 'Cursos'},
        {id: 'apps', name: 'Aplicativos'},
    ];

    return (
        <>
            <S.H1>Produto <S.ButtonNew onClick={handleNewProduct}>Adicionar</S.ButtonNew></S.H1>

            <form onSubmit={handleSubmit}>
                <S.Fieldset>
                    <S.Label htmlFor="name">Nome</S.Label>
                    <S.Input id="name" type="text" value={product.name || ''} onChange={handleProductInput} />
                </S.Fieldset>
                <S.Fieldset>
                    <S.Label htmlFor="regularPrice">Preço Regular</S.Label>
                    <S.Input id="regularPrice" type="text" value={product.regularPrice || ''} onChange={handleProductInput} />
                </S.Fieldset>
                <S.Fieldset>
                    <S.Label htmlFor="price">Preço atual</S.Label>
                    <S.Input id="price" type="text" value={product.price || ''} onChange={handleProductInput} />
                </S.Fieldset>
                <S.Fieldset>
                    <S.Label htmlFor="category">Categoria</S.Label>
                    <S.Select id="category" value={product.category} onChange={handleProductInput}>
                        <option value="" disabled></option>
                        {
                            categories.map((category, index) => (  
                                <option 
                                    key={index}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </S.Select>
                </S.Fieldset>
                <S.ButtonContainer>
                    <S.ButtonSubmit type="submit">Salvar</S.ButtonSubmit>
                    { !product.name ? '' : <S.ButtonDelete type="button" onClick={() => props.handleDeleteProduct(product.id)}>Deletar</S.ButtonDelete> }
                </S.ButtonContainer>
            </form>
        </>
    )
}