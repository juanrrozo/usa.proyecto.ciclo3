package usa.ciclo3.proyecto.service;


        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;
        import usa.ciclo3.proyecto.model.Reservation;
        import usa.ciclo3.proyecto.reports.ContClient;
        import usa.ciclo3.proyecto.reports.StatusReservation;
        import usa.ciclo3.proyecto.repository.ReservationRepository;

        import java.text.ParseException;
        import java.text.SimpleDateFormat;
        import java.util.ArrayList;
        import java.util.Date;
        import java.util.List;
        import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }
    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }
    public Reservation save(Reservation r){
        if (r.getIdReservation()==null){
            return reservationRepository.save(r);
        }else{
            Optional<Reservation> reseraux=reservationRepository.getReservation(r.getIdReservation());
            if (reseraux.isEmpty()){
                return reservationRepository.save(r);
            }else{
                return r;
            }
        }
    }
    public Reservation update(Reservation r){
        if(r.getIdReservation()!=null){
            Optional<Reservation> e= reservationRepository.getReservation(r.getIdReservation());
            if(!e.isEmpty()){

                if(r.getStartDate()!=null){
                    e.get().setStartDate(r.getStartDate());
                }
                if(r.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(r.getDevolutionDate());
                }
                if(r.getStatus()!=null){
                    e.get().setStatus(r.getStatus());
                }
                reservationRepository.save(e.get());
                return e.get();
            }else{
                return r;
            }
        }else{
            return r;
        }
    }
    public boolean deleteReservation(int reservationId) {
        Boolean succes = getReservation(reservationId).map(r -> {
            reservationRepository.delete(r);
            return true;
        }).orElse(false);
        return succes;
    }
    public StatusReservation getReportStatusReservation() {
        List<Reservation> completed = reservationRepository.ReservationStatus("completed");
        List<Reservation> cancelled = reservationRepository.ReservationStatus("cancelled");
        return new StatusReservation(completed.size(), cancelled.size());
    }

    public List<Reservation> getReportTimeReservation(String datoA, String datoB) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date datoInicial = new Date();
        Date datoFinal = new Date();

        try {
            datoInicial = parser.parse(datoA);
            datoFinal = parser.parse(datoB);
        } catch (ParseException evt) {
            evt.printStackTrace();
        }
        if (datoInicial.before(datoFinal)) {
            return reservationRepository.ReservationTime(datoInicial, datoFinal);
        } else {
            return new ArrayList<>();
        }
    }

    public List<ContClient> serviceTopClient() {
        return reservationRepository.getTopClientes();
    }

}
