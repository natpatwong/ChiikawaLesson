// ============================================================
// บทเรียนภาษา Python
// แต่ละบทมีข้อมูล: ชื่อบท, คำอธิบาย, ตัวอย่างโค้ด, ผลลัพธ์,
// คำตอบที่ถูก (ใช้ตรวจคำตอบของผู้ใช้), และคำใบ้
// เพิ่มบทใหม่ได้โดยเพิ่ม object ใน array นี้
// ============================================================

const pythonLessons = [
  {
    id: 1,
    title: 'บทที่ 1 - Hello World',
    description:
      'ใช้คำสั่งด้านล่างนี้เพื่อแสดงข้อความ Hello World ออกทางหน้าจอ ลองอ่านดูแล้วทำความเข้าใจก่อนนะ',
    prompt: 'เขียนโปรแกรมแสดงข้อความ',
    promptText: '"Hello World"',
    exampleCode: `# ตัวอย่าง การพิมพ์ Hello World
print("Hello World")`,
    exampleOutput: 'Hello World',
    
    // ฟังก์ชันตรวจคำตอบ — รับ string ที่ผู้ใช้พิมพ์ คืน true ถ้าถูก
    check: (code) => {
      const normalized = code.replace(/\s+/g, '').replace(/'/g, '"');
      return normalized === 'print("HelloWorld")';
    },
    hint: 'ลองใช้คำสั่ง print("...") ดูสิ',
  },
  // === ตัวอย่าง: เพิ่มบทที่ 2 ===
  // {
  //   id: 2,
  //   title: 'บทที่ 2 - ตัวแปร',
  //   description: '...',
  //   exampleCode: 'x = 10\nprint(x)',
  //   exampleOutput: '10',
  //   check: (code) => code.includes('print(x)'),
  //   hint: '...',
  // },
];

// ข้อมูลภาพรวมของภาษา
const pythonInfo = {
  name: 'Python',
  displayName: 'Python',
  fileExt: '.py',
};

export { pythonLessons, pythonInfo };
export default pythonLessons;
