package usa.ciclo3.proyecto.reports;

import usa.ciclo3.proyecto.model.Client;

public class ContClient {
    
    private Long total;
    private Client client;

    public ContClient(Long total, Client client) {
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
