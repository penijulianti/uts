package com.uts.rooms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "room")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rooms {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 36, nullable = false)
    private Long id;

    @Column(name = "number")
    private Integer number;

    @Column(name = "building")
    private String building;

    @Column(name = "floor")
    private Integer floor;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "type")
    private String type;

    @Column(name = "roomName")
    private String roomName;
}
