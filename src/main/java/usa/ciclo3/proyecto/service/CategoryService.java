package usa.ciclo3.proyecto.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usa.ciclo3.proyecto.model.Category;
import usa.ciclo3.proyecto.repository.CategoryRepository;


import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll(){
        return categoryRepository.getALl();
    }
    public Optional<Category> getCategory(int id){
        return categoryRepository.getCategory(id);
    }
    public Category save(Category c){
        if(c.getId()== null){
            return categoryRepository.save(c);
        }else{
            Optional<Category> categoaux=categoryRepository.getCategory(c.getId());
            if (categoaux.isEmpty()){
                return categoryRepository.save(c);
            }else{
                return c;
            }
        }
    }
    public Category update(Category c){
        if(c.getId()!=null){
            Optional<Category> categoryup=categoryRepository.getCategory(c.getId());
            if(!categoryup.isEmpty()){
                if(c.getDescription()!=null){
                    categoryup.get().setDescription(c.getDescription());
                }
                if(c.getName()!=null){
                    categoryup.get().setName(c.getName());
                }
                return categoryRepository.save(categoryup.get());
            }
        }
        return c;
    }
    public boolean deleteCategory(int categoryId){
        Boolean succes=getCategory(categoryId).map(c -> {
            categoryRepository.delete(c);
            return true;
        }).orElse(false);
        return succes;
    }
}
