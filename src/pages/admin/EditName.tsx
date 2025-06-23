import { useParams } from "react-router-dom";


export default function EditName() {
    const {nameSlug} = useParams<{ nameSlug: string }>();
    
    
    if (!nameSlug) return <p>Error: Name slug is missing.</p>;
    
    return <div>EditName - {nameSlug}</div>;
}
