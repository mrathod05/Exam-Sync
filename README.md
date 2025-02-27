# Exam Sync - Scalable Online Exam Management 🚀  

**Full-stack exam management system built with a scalable backend architecture using NestJS, Kafka, Redis, and real-time WebSockets, along with a modern Next.js frontend for an interactive user experience.**  

---

## 📌 Overview  

Exam Sync is designed to handle **large-scale online exams with real-time monitoring and distributed event-driven processing**.  
This system enables **examiners** to create and manage exams seamlessly while allowing **students** to participate in a real-time, monitored exam environment.  

🔹 **Backend:** NestJS, Kafka, Redis, Socket.IO  
🔹 **Frontend:** Next.js 15, TailwindCSS, Framer Motion  
🔹 **Scalability:** Event-driven architecture using Kafka  
🔹 **Real-time Updates:** WebSockets for live monitoring  
🔹 **Performance Optimization:** Caching with Redis 

---

## 🎯 Key Features  

### **📊 Examiner Features**  
✔ Create and manage exams  
✔ Monitor exam progress in real-time  

### **🎓 Student Features**   
✔ Real-time exam access   
✔ Timer-based exam execution 

### **⚡ Backend Scalability & Performance Enhancements**  
✔ **Kafka for event-driven processing** (handles exam events asynchronously)  
✔ **Redis caching for fast data retrieval**  
✔ **Socket.IO for real-time communication**  

### **🎨 Frontend Enhancements**  
✔ **Next.js 15 for SSR & optimized performance**  
✔ **Framer Motion for smooth animations**  
✔ **TailwindCSS for modern UI**  

---

## 🚀 Tech Stack  

| **Technology** | **Backend (NestJS)** | **Frontend (Next.js)** |
|--------------|-------------------|-------------------|
| **Framework** | NestJS | Next.js 15 |
| **Real-time** | Socket.IO | Socket.IO |
| **State Management** | Kafka & Redis | React Hooks |
| **Styling** | N/A | TailwindCSS & Framer Motion |

---

## 🛠 Installation & Setup  

### **1️⃣ Prerequisites**  
Before proceeding, please make sure you have **Redis**, **Kafka** and **Zookeeper** installed and running.  

### **2️⃣ Clone the Repository**  
```bash
git clone https://github.com/mrathod05/Exam-Sync.git
cd Exam-Sync
```

### **3️⃣ Install Dependencies**  

#### **Backend**
```bash
cd backend
yarn
yarn build
yarn start
```
#### **Frontend**
```bash
cd frontend
yarn
yarn build
yarn start
```
