package com.uts.rooms.controller;

import com.uts.rooms.model.Rooms;
import com.uts.rooms.repository.RoomsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/rooms")
@RestController
public class RoomsController {
    @Autowired
    private RoomsRepo roomsRepo;

    @GetMapping
    public List<Rooms> getAll(){
        return roomsRepo.findAll();
    }

    @GetMapping("/{id}")
    public Object getById(@PathVariable Long id){
        Rooms rooms = roomsRepo.findById(id).orElse(null);
        if(rooms != null){
            return rooms;
        }else{
            return "Bangunan dengan ID " + id + "Tidak ada";
        }
    }

    @PostMapping
    public Rooms create(@RequestBody Rooms candidate){
        return roomsRepo.save(candidate);
    }

    @PutMapping("/{id}")
    public String editById(@PathVariable Long id, @RequestBody Rooms rooms) {
        Rooms existingCandidate = roomsRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Kandidat dengan ID " + id + " tidak ditemukan"));

        existingCandidate.setNumber(rooms.getNumber());
        existingCandidate.setBuilding(rooms.getBuilding());
        existingCandidate.setFloor(rooms.getFloor());
        existingCandidate.setCapacity(rooms.getCapacity());
        existingCandidate.setType(rooms.getType());
        existingCandidate.setRoomName(rooms.getRoomName());

        roomsRepo.save(existingCandidate);

        return "Bangunan berhasil diperbarui.";
    }


    // hapus kandidat berdasarkan ID
    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Long id) {
        roomsRepo.deleteById(id);
        return "Bangunan berhasil dihapus.";
    }

}
