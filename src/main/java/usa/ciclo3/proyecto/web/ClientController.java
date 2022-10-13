package usa.ciclo3.proyecto.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import usa.ciclo3.proyecto.model.Client;
import usa.ciclo3.proyecto.service.ClientService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Client")
@CrossOrigin(origins = "*",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class ClientController {

    @Autowired
   private ClientService clientService;

    @GetMapping("/all")
    public List<Client> getClients(){
        return clientService.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Client> getClient(@PathVariable("id")int id ){
        return clientService.getClient(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Client save(@RequestBody Client c){
        return clientService.save(c);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Client update(@RequestBody Client c){
        return clientService.update(c);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id")int clientId){
        return clientService.deleteClient(clientId);
    }
}
