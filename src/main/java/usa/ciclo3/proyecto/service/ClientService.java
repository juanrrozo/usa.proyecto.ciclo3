package usa.ciclo3.proyecto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usa.ciclo3.proyecto.model.Client;
import usa.ciclo3.proyecto.repository.ClientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
   private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }
    public Optional<Client> getClient(int id){
        return clientRepository.getClient(id);
    }

    public Client save(Client c){
        if (c.getIdClient()== null){
            return clientRepository.save(c);
        }else{
            Optional<Client> clientaux=clientRepository.getClient(c.getIdClient());
            if (clientaux.isEmpty()){
                return clientRepository.save(c);
            }else{
                return c;
            }
        }
    }
    public Client update (Client c) {
        if (c.getIdClient() != null) {
            Optional<Client> clientup = clientRepository.getClient(c.getIdClient());
            if (!clientup.isEmpty()) {
                if (c.getName() != null) {
                    clientup.get().setName(c.getName());
                }
                if (c.getAge() != null) {
                    clientup.get().setName(c.getName());
                }
                if (c.getPassword() != null) {
                    clientup.get().setPassword(c.getPassword());
                }
                clientRepository.save(c);
                return clientup.get();
            } else {
                return c;
            }
        } else {
            return c;
        }
    }
    public boolean deleteClient(int clientId){
        Boolean succes=getClient(clientId).map(c ->{
            clientRepository.delete(c);
            return true;
        }).orElse(false);
        return succes;
    }
}
