export type NameCardProps = {
  name: {
    id: string;
    name: string;
    nameInEnglish: string;
  };
};

export default function NameCard({ name }: NameCardProps) {
  return (
    <div className="name-card">
      <h3>{name.name}</h3>
      <p>{name.nameInEnglish}</p>
    </div>
  );
}
