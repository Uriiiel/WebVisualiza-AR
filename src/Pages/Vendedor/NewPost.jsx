import { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";
import { Navigate } from "react-router-dom";

function NewPost() {
    const { user } = useAuth();
    const [error, setError] = useState("");
    console.log(user);
    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        productPrice: "",
        productCategory: "",
    });

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = [];
        setError("");

        if (files.length > 3) {
            console.error("Solo se permiten subir un máximo de 3 imágenes");
            setError('Solo se permiten subir un máximo de 3 imágenes')
            return;
        }

        for (const file of files) {
            const storageRef = ref(storage, `productImages/${file.name}`);

            try {
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                imageUrls.push(downloadURL);
            } catch (error) {
                console.error("Error al subir imagen:", error);
            }
        }

        // Muestra las imágenes cargadas previamente
        setProduct({ ...product, imageUrls: imageUrls });
    };

    useEffect(() => {
        if (user) {
            console.log("Usuario autenticado:", user);
        } else {
            console.log("No hay usuario autenticado");
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Subir el producto a Firestore
            const docRef = await addDoc(collection(db, "productosInteriores"), {
                ...product,
                userEmail: user.email,
                userUid: user.uid,
                imageUrls: product.imageUrls,
            });
            console.log("Producto subido con ID:", docRef.id);
            Navigate("/upload-product");
        } catch (error) {
            console.error("Error al subir el producto:", error);
        }
    };

    return (
        <div className="flex justify-center h-full items-center ">
            <div className="w-full max-w-3xl mx-auto h-screen mt-16 px-8">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4">Agregar Producto de Interior</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                            Nombre del Producto
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="productName"
                            type="text"
                            name="productName"
                            placeholder="Nombre del Producto"
                            value={product.productName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                            Descripción del Producto
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline resize-none"
                            id="productDescription"
                            name="productDescription"
                            placeholder="Descripción del Producto"
                            value={product.productDescription}
                            onChange={handleChange}
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                            Precio del Producto
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="productPrice"
                            type="number"
                            name="productPrice"
                            placeholder="Precio del Producto"
                            value={product.productPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCategory">
                            Categoría del Producto
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="productCategory"
                            type="text"
                            name="productCategory"
                            placeholder="Categoría del Producto"
                            value={product.productCategory}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6 mb-6 flex justify-center items-center flex-wrap">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImages">
                            Imágenes del Producto (Máximo 3)
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="productImages"
                            type="file"
                            name="productImages"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-6 flex items-center">
                        {product.imageUrls && product.imageUrls.length > 0 && (
                            <>
                                <img
                                    src={product.imageUrls[0]}
                                    alt="First Image"
                                    className="w-2/3 pr-2"
                                    style={{ maxWidth: '500px' }}
                                />
                                <div className="w-1/3 flex flex-col">
                                    {product.imageUrls.slice(1, 3).map((imageUrl, index) => (
                                        <img
                                            key={index + 1}
                                            src={imageUrl}
                                            alt={`Image ${index}`}
                                            className="mb-1"
                                            style={{ maxWidth: '200px' }}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Agregar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewPost