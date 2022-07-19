import React, { useState } from "react"

const ProductContext = React.createContext({
    products: [],
    toggleFav: () => {}
})

export const ProductContextProvider = (props) => {
    const [productList, setProductsList] = useState([
        {
            id: 'p1',
            title: 'Red Scarf',
            description: 'A pretty red scarf.',
            isFavorite: false
        },
        {
            id: 'p2',
            title: 'Blue T-Shirt',
            description: 'A pretty blue t-shirt.',
            isFavorite: false
        },
        {
            id: 'p3',
            title: 'Green Trousers',
            description: 'A pair of lightly green trousers.',
            isFavorite: false
        },
        {
            id: 'p4',
            title: 'Orange Hat',
            description: 'Street style! An orange hat.',
            isFavorite: false
        }
    ])

    const toggleFavorite = (productId) => {
        const productIndex = productList.findIndex(p => p.id === productId)
        const newFavStatus = !productList[productIndex].isFavorite
        const updatedProducts = [...productList]
        updatedProducts[productIndex] = {
            ...productList[productIndex],
            isFavorite: newFavStatus
        }

        setProductsList(updatedProducts)
    }

    return <ProductContext.Provider value={{
        products: productList,
        toggleFav: toggleFavorite
    }}>
        {props.children}
    </ProductContext.Provider>
}

export default ProductContext