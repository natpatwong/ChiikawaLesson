// ============================================================
// บทเรียนภาษา Java
// โครงสร้างเหมือน Python.js — เพิ่มบทใหม่ได้โดยเพิ่ม object
// ============================================================

const javaLessons = [
  {
    id: 1,
    title: 'บทที่ 1 - Hello World',
    description:
      'ใช้คำสั่งด้านล่างนี้เพื่อแสดงข้อความ Hello World ออกทางหน้าจอ ลองอ่านดูแล้วทำความเข้าใจก่อนนะ',
    prompt: 'เขียนโปรแกรมแสดงข้อความ',
    promptText: '"Hello World"',
    exampleCode: `// ตัวอย่าง การพิมพ์ Hello World
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,
    exampleOutput: 'Hello World',
    // ตรวจคำตอบ: ยอมรับเฉพาะบรรทัด println หรือทั้ง class ก็ได้
    check: (code) => {
      const normalized = code.replace(/\s+/g, '');
      return (
        normalized.includes('System.out.println("HelloWorld");') ||
        normalized.includes("System.out.println('HelloWorld');")
      );
    },
    hint: 'ลองใช้คำสั่ง System.out.println("..."); ดูสิ',
  },
  // === ตัวอย่าง: เพิ่มบทที่ 2 ===
  // {
  //   id: 2,
  //   title: 'บทที่ 2 - ตัวแปร',
  //   description: '...',
  //   exampleCode: 'int x = 10;\nSystem.out.println(x);',
  //   exampleOutput: '10',
  //   check: (code) => code.includes('System.out.println(x)'),
  //   hint: '...',
  // },
];

const javaInfo = {
  name: 'Java',
  displayName: 'Java',
  fileExt: '.java',
};

export { javaLessons, javaInfo };
export default javaLessons;
