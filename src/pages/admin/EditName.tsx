interface EditNameProps {
  nameSlug: string;
}

export default function EditName({ nameSlug }: EditNameProps) {
  return <div>EditName - {nameSlug}</div>;
}
