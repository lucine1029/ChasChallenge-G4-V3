//@ts-nocheck

interface Props {}

function AvatarCard({ name, imageUrl }) {
  return (
    <div
      style={{ display: 'inline-block', margin: '10px', textAlign: 'center' }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <p>{name}</p>
    </div>
  );
}

export default AvatarCard;
