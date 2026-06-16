import mongoose from "mongoose"
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);


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