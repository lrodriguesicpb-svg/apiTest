import mongoose from "mongoose"
import dns from "dns";

// Setando um dns
dns.setServers(["8.8.8.8", "8.8.4.4"]);


// Inicia conexão com o mongodb e define o nome do aplicativo
const connectDB = async () => {
    try {
        
        console.log("Conectando ao MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI,
            {
                appName: "Cluster0",
                serverSelectionTimeoutMS: 5000,
            }
        );
        console.log("Conectado ao MongoDB com sucesso!");
    } catch (error) {
        console.error(error);
    }
}

export default { connectDB }