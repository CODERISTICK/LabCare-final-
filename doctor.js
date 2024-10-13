function showDetails(doctorName) {
    const details = {
        "Juan DelaCruz": "Specializes in Urine & Blood Tests.",
        "Juan Tamad": "Specializes in MRI Scans & Ultrasound.",
        "Pedro Penduko": "Specializes in X-Ray Tests.",
        "Cardo Dalisay": "Specializes in Blood Tests.",
        "Rigor Dimagiba": "Specializes in MRI Scans.",
        "Tito Sotto": "Specializes in Ultrasound.",
        "Tanggol Montegnegro": "Specializes in X-Ray Tests."
    };

    document.getElementById("doctor-name").innerText = doctorName;
    document.getElementById("doctor-specialty").innerText = details[doctorName];
    document.getElementById("doctor-details").style.display = "block";
}

function closeDetails() {
    document.getElementById("doctor-details").style.display = "none";
}
