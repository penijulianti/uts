import { Room } from "../App";

export default function RoomCard({
    room,
    onDelete,
    onEdit,
  }: {
    room: Room;
    onDelete: (id: number) => void;
    onEdit:(room: Partial<Room>) => void;
  }) {
    return (
        <div className="flex gap-4 ml-10">
            <div className="grid grid-cols-1 mb-6">
          <h1 onClick={() => onEdit(room)} className="cursor-pointer font-bold">
            {room.roomName}
          </h1>
          <h2>Lantai {room.floor}</h2>
          <h2>Kapasitas {room.capacity}</h2>
          <div className="ml-auto">
          <button
            className="bg-red-400 text-white rounded-lg w-24 mr-8 mb-8"
            onClick={() => {
              if (confirm("Apakah Anda yakin ingin menghapus ruangan ini?")) {
                onDelete(room.id);
              }
            }}
          >
            Hapus
          </button>
          <button
        className="bg-emerald-300 text-white rounded-lg w-24"
        onClick={() => onEdit(room)}
      >
        Edit
      </button>
      </div>
      </div>
        </div>
      );
    }
