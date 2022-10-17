package usa.ciclo3.proyecto.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usa.ciclo3.proyecto.model.Client;
import usa.ciclo3.proyecto.model.Reservation;
import usa.ciclo3.proyecto.reports.ContClient;
import usa.ciclo3.proyecto.repository.crud.ReservationCrudRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ReservationRepository {

    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll(){
        return(List<Reservation>) reservationCrudRepository.findAll();
    }
    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }
    public Reservation save(Reservation r){
        return reservationCrudRepository.save(r);
    }

    public void delete (Reservation r){
        reservationCrudRepository.delete(r);
    }
    public List<Reservation> ReservationStatus(String status){
        return  reservationCrudRepository.findAllByStatus(status);
    }
    public List<Reservation> ReservationTime(Date a, Date b) {
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);
    }

    public List<ContClient> getTopClientes() {
        List<ContClient> response = new ArrayList<>();
        List<Object[]> report = reservationCrudRepository.countTotalReservationsByClient();
        for (int i = 0; i < report.size(); i++) {
            response.add(new ContClient((Long) report.get(i)[1], (Client) report.get(i)[0]));
        }
        return response;
    }
}
