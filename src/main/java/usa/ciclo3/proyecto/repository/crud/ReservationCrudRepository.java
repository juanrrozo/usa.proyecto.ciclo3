package usa.ciclo3.proyecto.repository.crud;


import org.springframework.data.repository.CrudRepository;
import usa.ciclo3.proyecto.model.Reservation;


public interface ReservationCrudRepository extends CrudRepository<Reservation,Integer> {
}
