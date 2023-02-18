package techmaster.blogbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "image")
@Entity
@Getter
@Setter
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    private LocalDateTime created_at;

    @Lob // Large object
    private Byte[] data;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}