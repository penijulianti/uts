import { useEffect, useState } from "react";
import RoomCard from "./components/RoomCard";

export interface Room {
  id: number;
  number: number;
  building: string;
  floor: number;
  capacity: number;
  type: string;
  roomName: string;
}

export default function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [room, setRoom] = useState<Partial<Room>>({
    number: 0,
    building: "",
    floor: 1,
    capacity: 20,
    type: "",
    roomName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [sortOrderByName, setSortOrderByName] = useState<"asc" | "desc">("asc"); // State untuk urutan sorting nama
  const [sortOrderById, setSortOrderById] = useState<"asc" | "desc">("asc"); // State untuk urutan sorting ID
  const [filterType, setFilterType] = useState<string>(""); // State untuk filter berdasarkan tipe
  const [filterFloor, setFilterFloor] = useState<number | null>(null); // State untuk filter berdasarkan lantai

  useEffect(() => {
    fetch("http://localhost:8080/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        const sortedRooms = data.sort((a: Room, b: Room) => a.id - b.id);
        setRooms(sortedRooms);
      });
  }, []);

  function handleAdd() {
    fetch("http://localhost:8080/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    })
      .then((response) => response.json())
      .then((newRoom) => {
        const updatedRooms = [...rooms, newRoom].sort((a, b) => a.id - b.id);
        setRooms(updatedRooms);
        setRoom({
          number: 0,
          building: "",
          floor: 1,
          capacity: 20,
          type: "",
          roomName: "",
        });
      });
  }

  function handleDelete(id: number) {
    fetch(`http://localhost:8080/api/rooms/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        const updatedRooms = rooms.filter((room) => room.id !== id).sort((a, b) => a.id - b.id);
        setRooms(updatedRooms);
      }
    });
  }

  function handleEdit() {
    fetch(`http://localhost:8080/api/rooms/${room.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    })
      .then((response) => response.json())
      .then((updatedRoom) => {
        const updatedRooms = rooms
          .map((room) =>
            room.id === updatedRoom.id ? updatedRoom : room
          )
          .sort((a, b) => a.id - b.id);
        setRooms(updatedRooms);
        setRoom({ 
          id: 0, 
          number: 0,
          building: "",
          floor: 1,
          capacity: 20,
          type: "",
          roomName: ""});
        setIsEditing(false);
        console.log('Success:', updatedRoom);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  function handleSortByName() {
    const sortedRooms = [...rooms];
    if (sortOrderByName === "asc") {
      sortedRooms.sort((a, b) => a.roomName.localeCompare(b.roomName));
      setSortOrderByName("desc");
    } else {
      sortedRooms.sort((a, b) => b.roomName.localeCompare(a.roomName));
      setSortOrderByName("asc");
    }
    setRooms(sortedRooms);
  }

  function handleSortByNameAsc() {
    const sortedRooms = [...rooms].sort((a, b) => a.roomName.localeCompare(b.roomName));
    setRooms(sortedRooms);
    setSortOrderByName("asc");
  }

  function handleSortByNameDesc() {
    const sortedRooms = [...rooms].sort((a, b) => b.roomName.localeCompare(a.roomName));
    setRooms(sortedRooms);
    setSortOrderByName("desc");
  }

  function handleSortByIdAsc() {
    const sortedRooms = [...rooms].sort((a, b) => a.id - b.id);
    setRooms(sortedRooms);
    setSortOrderById("asc");
  }

  function handleSortByIdDesc() {
    const sortedRooms = [...rooms].sort((a, b) => b.id - a.id);
    setRooms(sortedRooms);
    setSortOrderById("desc");
  }

  // const filteredRooms = rooms.filter((room) => {
  //   let matchesType = true;
  //   let matchesFloor = true;

  //   if (filterType && room.type !== filterType) {
  //     matchesType = false;
  //   }

  //   if (filterFloor !== null && room.floor !== filterFloor) {
  //     matchesFloor = false;
  //   }

  //   return matchesType && matchesFloor && room.roomName.toLowerCase().includes(searchTerm.toLowerCase());
  // });
  const filteredRooms = rooms.filter((room) => {
    let matchesType = true;

    if (filterType && room.type !== filterType) {
      matchesType = false;
    }

    return matchesType && room.roomName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-white rounded-lg p-6">
      <h1 className="mb-5">Hotel Zuan's</h1>
      <div className="flex flex-row mb-5 justify-start hover:justify-between">
        <input
          type="text"
          placeholder="Cari Nama Ruangan"
          className="border p-2 my-8 mr-2 w-52"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-rose-300 rounded-lg mt-8 mr-2 h-10 w-1/4"
          onClick={handleSortByNameAsc}
        >
          Sort A-Z (Nama)
        </button>
        <button
          className="bg-rose-300 rounded-lg mt-8 mr-5 h-10 w-1/4"
          onClick={handleSortByNameDesc}
        >
          Sort Z-A (Nama)
        </button>
        <button
          className="bg-rose-300 rounded-lg mt-8 mr-5 h-10 w-1/4"
          onClick={handleSortByIdAsc}
        >
          Sort Asc (ID)
        </button>
        <button
          className="bg-rose-300 rounded-lg mt-8 mr-5 h-10 w-1/4"
          onClick={handleSortByIdDesc}
        >
          Sort Desc (ID)
        </button>
        <div className="flex mb-5 justify-between">
        <div className="flex items-center">
          <label htmlFor="filterType" className="mr-2">Tipe Ruangan:</label>
          <select
            id="filterType"
            className="border p-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Semua</option>
            <option value="Standard Room">Standard Room</option>
            <option value="Deluxe Room">Deluxe Room</option>
            <option value="VIP Room">VIP</option>
            <option value="Auditorium">Auditorium</option>
          </select>
        </div>

      </div>
        
      </div>
      <h1 className="text-center mb-8 font-bold">Daftar Ruangan Hotel Zuan's</h1>
      <div className="grid grid-cols-2 gap-10">
        <div className="mb-5">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onDelete={handleDelete}
              onEdit={(r) => {
                setRoom(r);
                setIsEditing(true);
              }}
            />
          ))}
        </div>
        <div className="grid grid-rows-1 gap-1 border rounded-lg p-2 w-full">
          <div className="my-8 text-center font-semibold">
            <h2>{isEditing ? "Edit Ruangan" : "Tambah Ruangan"}</h2>
          </div>
          <div className="grid grid-cols-4 gap-6 mx-4">
            <label htmlFor="number" className="block">Nomor Ruangan</label>
            <input
              id="number"
              type="number"
              className="border p-2"
              value={room.number}
              onChange={(e) =>
                setRoom({ ...room, number: parseInt(e.target.value) })
              }
            />
            <label htmlFor="name" className="block">Nama Bangunan</label>
            <input
              id="name"
              className="border p-2"
              value={room.building}
              onChange={(e) => setRoom({ ...room, building: e.target.value })}
            />
            <label htmlFor="number" className="block">Lantai ke-</label>
            <input
              id="number"
              type="number"
              className="border p-2"
              value={room.floor}
              onChange={(e) =>
                setRoom({ ...room, floor: parseInt(e.target.value) })
              }
            />
            <label htmlFor="number" className="block">Kapasitas</label>
            <input
              id="number"
              type="number"
              className="border p-2"
              value={room.capacity}
              onChange={(e) =>
                setRoom({ ...room, capacity: parseInt(e.target.value) })
              }
            />
            <label htmlFor="batch" className="block">Tipe Ruangan</label>
            <input
              id="batch"
              className="border p-2"
              value={room.type}
              onChange={(e) =>
                setRoom({ ...room, type: e.target.value })
              }
            />
            <label htmlFor="batch" className="block">Nama Ruangan</label>
            <input
              id="batch"
              className="border p-2"
              value={room.roomName}
              onChange={(e) =>
                setRoom({ ...room, roomName: e.target.value })
              }
            />
            <div className="flex justify-center mt-4">
              <button
                className="bg-pink-400 text-white rounded-lg p-2"
                onClick={isEditing ? handleEdit : handleAdd}
              >
                {isEditing ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
