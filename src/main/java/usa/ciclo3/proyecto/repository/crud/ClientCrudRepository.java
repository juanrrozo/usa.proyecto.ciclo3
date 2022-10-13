package usa.ciclo3.proyecto.repository.crud;


import org.springframework.data.repository.CrudRepository;
import usa.ciclo3.proyecto.model.Client;


public interface ClientCrudRepository extends CrudRepository <Client,Integer> {
}
