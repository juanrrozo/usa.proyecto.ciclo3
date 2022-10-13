package usa.ciclo3.proyecto.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usa.ciclo3.proyecto.model.Computer;
import usa.ciclo3.proyecto.repository.ComputerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ComputerService {

    @Autowired
    private ComputerRepository computerRepository;

    public List<Computer> getAll(){
        return computerRepository.getAll();
    }

    public Optional<Computer> getComputer(int id){
        return computerRepository.getComputer(id);
    }
    public Computer save(Computer c){
        if (c.getId() == null){
            return computerRepository.save(c);
        }else{
            Optional<Computer> compuaux=computerRepository.getComputer(c.getId());
            if (compuaux.isEmpty()){
                return computerRepository.save(c);
            }else{
                return (c);
            }
        }
    }
    public Computer update(Computer c){
        if(c.getId()!=null){
            Optional<Computer> computerup=computerRepository.getComputer(c.getId());
            if(!computerup.isEmpty()){
                if (c.getName()!=null){
                    computerup.get().setName(c.getName());
                }
                if (c.getBrand()!=null){
                    computerup.get().setBrand(c.getBrand());
                }
                if (c.getYear()!=null){
                    computerup.get().setYear(c.getYear());
                }
                if (c.getDescription()!=null){
                    computerup.get().setDescription(c.getDescription());
                }
                if (c.getCategory()!=null){
                    computerup.get().setCategory(c.getCategory());
                }
                computerRepository.save(computerup.get());
                return computerup.get();
            }else{
                return c;
            }
        }else{
            return c;
        }
    }
    public boolean deleteComputer(int computerId){
        Boolean succes=getComputer(computerId).map(c ->{
            computerRepository.delete(c);
            return true;
        }).orElse(false);
        return succes;
    }

}
