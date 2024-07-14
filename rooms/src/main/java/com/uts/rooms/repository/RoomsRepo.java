package com.uts.rooms.repository;

import com.uts.rooms.model.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomsRepo extends JpaRepository<Rooms, Long> {
}
