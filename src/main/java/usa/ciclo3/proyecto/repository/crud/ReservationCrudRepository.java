package usa.ciclo3.proyecto.repository.crud;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import usa.ciclo3.proyecto.model.Reservation;

import java.util.Date;
import java.util.List;


public interface ReservationCrudRepository extends CrudRepository<Reservation,Integer> {
    public List<Reservation> findAllByStatus(String status);

    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);

    // select clientId, count(*) as "total" from reservacion group by cliendId order by total desc;
    @Query ("SELECT c.client, COUNT(c.client) from Reservation AS c group by c.client order by COUNT(c.client)DESC")
    public List<Object[]> countTotalReservationsByClient();
}
