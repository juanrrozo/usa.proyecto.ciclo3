package usa.ciclo3.proyecto.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usa.ciclo3.proyecto.model.Message;
import usa.ciclo3.proyecto.repository.MessageRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }
    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }
    public Message save(Message m){
        if(m.getIdMessage()== null){
            return messageRepository.save(m);
        }else{
            Optional<Message> messageaux=messageRepository.getMessage(m.getIdMessage());
            if(messageaux.isEmpty()){
                return messageRepository.save(m);
            }else{
                return m;
            }
        }
    }
    public Message update(Message m){
        if(m.getIdMessage()!=null){
            Optional<Message> messageup= messageRepository.getMessage(m.getIdMessage());
            if(!messageup.isEmpty()){
                if(m.getMessageText()!=null){
                    messageup.get().setMessageText(m.getMessageText());
                }
                messageRepository.save(messageup.get());
                return messageup.get();
            }else{
                return m;
            }
        }else{
            return m;
        }
    }
    public boolean deleteMessage(int messageId) {
        Boolean succes = getMessage(messageId).map(m -> {
            messageRepository.delete(m);
            return true;
        }).orElse(false);
        return succes;
    }
}
