package usa.ciclo3.proyecto.repository.crud;


import org.springframework.data.repository.CrudRepository;
import usa.ciclo3.proyecto.model.Message;


public interface MessageCrudRepository extends CrudRepository<Message,Integer> {
}
