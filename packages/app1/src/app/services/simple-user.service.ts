// Servicio simple para manejar el usuario actual
export class SimpleUserService {

    private static currentUserId = '1';
    private static readonly listeners: ((id: string) => void)[] = [];

    static getCurrentUserId(): string {
        return this.currentUserId;
    }

    static setCurrentUserId(id: string): void {
        this.currentUserId = id;
        // Notificar a todos los listeners
        this.listeners.forEach(listener => listener(id));
    }

    static subscribe(listener: (id: string) => void): () => void {
        this.listeners.push(listener);
        // Retornar función para desuscribirse
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
}