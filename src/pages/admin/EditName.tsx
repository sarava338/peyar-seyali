import { useParams } from "react-router-dom";


export default function EditName() {
    const {nameSlug} = useParams<{ nameSlug: string }>();
    
    
    if (!nameSlug) return <p>Error: Name slug is missing.</p>;
    
    return <h1>EditName - {nameSlug}</h1>;
}
