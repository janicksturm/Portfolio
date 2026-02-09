from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
def status():
    return {
        "cpu_percent": psutil.cpu_percent(),
        "ram_percent": psutil.virtual_memory().percent,
        "disk_percent": psutil.disk_usage('/').percent,
        "uptime_seconds": round(time.time() - psutil.boot_time())
    }

@app.get("/disk")
def getDiskUsage():
    disk = psutil.disk_usage('/')
    return {
        "total_space": (disk.total / (1000**3)),
        "used_space": (disk.used / (1000**3)),
        "free_space": (disk.free / (1000**3))
    }