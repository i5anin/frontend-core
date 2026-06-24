---
tags:
  - веб-разработка
  - javascript
created: 2025-04-13
date: 2025-04-13
---
Для создания подобных узоров (гипоциклоидов и эпициклоидов) можно использовать библиотеку p5.js (JavaScript) или Matplotlib + NumPy (Python).  

**Выбор библиотеки**
1. Если нужен веб-интерфейс (JavaScript):  
   - [p5.js](https://p5js.org/) – библиотека для генеративного искусства и математических узоров.  
   - Можно создать динамические спирали и анимации.  

2. Если нужен рендеринг изображений (Python):  
   - Matplotlib + NumPy – удобно для статичных изображений.  
   - Можно экспортировать в PNG, SVG, PDF.  

3. Альтернативы:  
   - Processing (Java/Python) – хорош для креативного программирования.  
   - Manim (Python) – мощный инструмент для анимаций с математической графикой.  

**Пример на p5.js (JavaScript)**
```JavaScript
function setup() {
  createCanvas(500, 500);
  noFill();
  translate(width / 2, height / 2);
  
  let R = 150; // Радиус большого круга
  let r = 50;  // Радиус маленького круга
  let d = 75;  // Расстояние от центра маленького круга до карандаша
  
  beginShape();
  for (let t = 0; t < TWO_PI * 10; t += 0.01) {
    let x = (R - r) * cos(t) + d * cos((R - r) / r * t);
    let y = (R - r) * sin(t) - d * sin((R - r) / r * t);
    vertex(x, y);
  }
  endShape();
}

```

**Пример на Python (Matplotlib)**
```JavaScript
import numpy as np
import matplotlib.pyplot as plt

def spirograph(R, r, d, steps=1000):
    t = np.linspace(0, 10 * np.pi, steps)
    x = (R - r) * np.cos(t) + d * np.cos((R - r) / r * t)
    y = (R - r) * np.sin(t) - d * np.sin((R - r) / r * t)
    
    plt.plot(x, y, color='red')
    plt.axis('equal')
    plt.show()

spirograph(R=150, r=50, d=75)
```

**Вывод**
Если нужен веб-интерфейс — p5.js.  
Если требуется экспорт изображений — Matplotlib + NumPy (Python).  
Если нужна анимация — Processing или Manim.  

Какой вариант тебе больше подходит? 🚀

---

## Связанные

- [[AI]]
- [[Matplotlib (2)]]
- [[Академия искусственного интеллекта]]
- [[ИИ с PostgreSQL]]
- [[Как прокачаться в ИИ (AI) в 2025 году]]
- [[Курс по нейросетям от инженеров NVIDIA]]
