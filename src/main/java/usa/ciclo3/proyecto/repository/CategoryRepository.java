package usa.ciclo3.proyecto.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usa.ciclo3.proyecto.model.Category;
import usa.ciclo3.proyecto.repository.crud.CategoryCrudRepository;


import java.util.List;
import java.util.Optional;

@Repository
public class CategoryRepository {
    @Autowired
    private CategoryCrudRepository categoryCrudRepository;

    public List<Category> getALl(){
        return (List<Category>) categoryCrudRepository.findAll();
    }

    public Optional<Category> getCategory(int id){
        return categoryCrudRepository.findById(id);
    }
    public Category save (Category c){
        return categoryCrudRepository.save(c);
    }
    public void delete (Category c){
        categoryCrudRepository.delete(c);
    }
}
