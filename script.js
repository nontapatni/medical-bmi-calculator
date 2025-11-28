// กำหนดค่าคงที่สำหรับเวลาในหน่วยมิลลิวินาที
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const DAYS_IN_GESTATION = 280; // การตั้งครรภ์โดยเฉลี่ย 40 สัปดาห์

document.getElementById('ga-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // 1. ดึงค่า LMP และ วันอ้างอิง (Reference Date)
    const lmpDateString = document.getElementById('lmp-date').value;
    const refDateString = document.getElementById('ref-date').value;
    
    // ตรวจสอบความสมบูรณ์ของข้อมูล
    if (!lmpDateString || !refDateString) {
        alert("กรุณาป้อนวันที่ทั้ง LMP และ วันอ้างอิง");
        return;
    }

    // แปลง String เป็น Object Date
    const lmp = new Date(lmpDateString);
    const refDate = new Date(refDateString);
    
    // ตั้งค่าเวลาให้เป็น 00:00:00 เพื่อให้การคำนวณวันแม่นยำขึ้น
    lmp.setHours(0, 0, 0, 0);
    refDate.setHours(0, 0, 0, 0);

    // 2. คำนวณจำนวนวันทั้งหมด
    // ใช้ค่า Time Stamp (มิลลิวินาที) ในการหาผลต่าง
    const timeDifference = refDate.getTime() - lmp.getTime();
    
    // ป้องกันกรณีที่ LMP มากกว่า วันอ้างอิง
    if (timeDifference < 0) {
        alert("วันอ้างอิงต้องไม่เร็วกว่าวัน LMP กรุณาตรวจสอบวันที่");
        return;
    }

    const totalDays = Math.floor(timeDifference / MS_PER_DAY);
    
    // 3. แปลงเป็น สัปดาห์ (Weeks) และ วัน (Days)
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    // 4. คำนวณ EDD (วันครบกำหนดคลอด)
    // EDD = LMP + 280 วัน
    const eddTime = lmp.getTime() + (DAYS_IN_GESTATION * MS_PER_DAY);
    const edd = new Date(eddTime);

    // 5. แสดงผลลัพธ์
    document.getElementById('ga-value').textContent = `${weeks} สัปดาห์ ${days} วัน`;
    
    // แสดงผล EDD ในรูปแบบที่อ่านง่าย
    document.getElementById('edd-value').textContent = edd.toLocaleDateString('th-TH', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }); 
});