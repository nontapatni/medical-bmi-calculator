// 1. รอให้เอกสาร HTML ถูกโหลดเสร็จ แล้วรอฟังเหตุการณ์ 'submit' จาก Form ID 'bmi-form'
document.getElementById('bmi-form').addEventListener('submit', function(event) {
    
    // สำคัญมาก! ป้องกันไม่ให้หน้าเว็บโหลดซ้ำเมื่อกดปุ่ม Submit
    event.preventDefault(); 

    // 2. ดึงค่าจากช่อง Input
    //   - ดึงค่าจาก ID 'weight' (น้ำหนัก)
    //   - ใช้ parseFloat() เพื่อแปลงค่าข้อความที่ได้มาให้เป็นตัวเลขทศนิยม
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    // 3. ตรวจสอบความถูกต้องของค่าที่ป้อน
    if (weight > 0 && height > 0) {
        
        // 4. คำนวณ BMI ตามสูตร: weight / (height * height)
        const bmi = weight / (height * height);

        // 5. แสดงผลลัพธ์
        
        //   - แสดงค่า BMI (ทศนิยม 2 ตำแหน่ง) ไปยัง ID 'bmi-value'
        document.getElementById('bmi-value').textContent = bmi.toFixed(2);
        
        //   - แสดงการแปลผลไปยัง ID 'bmi-status'
        document.getElementById('bmi-status').textContent = getBmiStatus(bmi);
    } else {
        // หากป้อนค่าไม่ถูกต้อง (เช่น 0 หรือค่าว่าง)
        document.getElementById('bmi-value').textContent = "โปรดตรวจสอบค่า";
        document.getElementById('bmi-status').textContent = "---";
    }
});

// ----------------------------------------------------
// ฟังก์ชันเสริม: สำหรับการแปลผล BMI (Classification)
// ----------------------------------------------------
function getBmiStatus(bmi) {
    if (bmi < 18.5) {
        return 'ผอมเกินไป (Underweight)';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return 'น้ำหนักปกติ (Normal Weight)';
    } else if (bmi >= 25 && bmi <= 29.9) {
        return 'น้ำหนักเกิน (Overweight)';
    } else {
        return 'โรคอ้วน (Obesity)';
    }
}