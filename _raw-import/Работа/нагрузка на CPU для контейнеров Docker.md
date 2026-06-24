---
tags:
  - веб-разработка
  - docker
  - git
  - консоль
created: 2025-01-22
date: 2025-01-22
---
Чтобы вывести график работы и нагрузку на CPU для контейнеров [Docker](./Docker), можно использовать несколько подходов. Вот основные из них:

---

**1. **Использование команды `docker stats`****

Команда `docker stats` показывает в реальном времени использование ресурсов для каждого работающего контейнера, включая CPU, память, сеть и диски.

```bash
docker stats
```

Вывод будет примерно следующим:

```plaintext
CONTAINER ID   NAME          CPU %     MEM USAGE / LIMIT   MEM %   NET I/O   BLOCK I/O   PIDS
3f430376eaba   php_api       2.34%     123MiB / 2GiB       6.01%   5kB / 1kB 10MB / 0B   15
af94cd740b4f   tg_bot_node   1.12%     98MiB / 2GiB        4.90%   2kB / 3kB 5MB / 1MB    12
```

---

**2. **Графическое отображение: Docker Desktop****

Если вы используете **Docker Desktop**, он предоставляет графический интерфейс для мониторинга ресурсов. Вы можете увидеть графики CPU, памяти и сети для каждого контейнера в реальном времени.

---

**3. **Использование инструментов мониторинга: cAdvisor****

[**cAdvisor**](https://github.com/google/cadvisor) — это инструмент от Google для мониторинга контейнеров, который предоставляет графики и метрики в реальном времени.

**Установка cAdvisor:**

1. Запустите cAdvisor как контейнер:
    
    ```bash
    docker run -d \
      --name=cadvisor \
      --volume=/:/rootfs:ro \
      --volume=/var/run:/var/run:ro \
      --volume=/sys:/sys:ro \
      --volume=/var/lib/docker/:/var/lib/docker:ro \
      --publish=8080:8080 \
      gcr.io/cadvisor/cadvisor:latest
    ```
    
2. Откройте браузер и перейдите по адресу:
    
    ```
    http://localhost:8080
    ```
    
3. Вы увидите подробные графики нагрузки CPU, памяти, сети и дисков.
    

---

**4. **Использование `docker-compose` с Prometheus и Grafana****

Если вам нужно более масштабное решение для мониторинга, используйте связку **Prometheus** и **Grafana**.

**Пример `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
```

1. Создайте файл `prometheus.yml` рядом с `docker-compose.yml`:
    
    ```yaml
    global:
      scrape_interval: 15s
    
    scrape_configs:
      - job_name: "node"
        static_configs:
          - targets: ["node-exporter:9100"]
    ```
    
2. Запустите:
    
    ```bash
    docker-compose up -d
    ```
    
3. Откройте Grafana на `http://localhost:3000`, настройте источник данных (Prometheus), и создайте графики.
    

---

**5. **Использование сторонних инструментов****

Многие инструменты для мониторинга контейнеров могут быть интегрированы с Docker:

- **Datadog**
- **Zabbix**
- **New Relic**


---

## Связанные

- [[Docker]]
- [[commands Docker min]]
- [[Cущности в docker-compose.yml]]
- [[Docker Registry]]
- [[Docker Trust]]
- [[Docker Volume]]
