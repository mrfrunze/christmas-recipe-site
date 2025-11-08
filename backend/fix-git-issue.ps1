# Скрипт для исправления проблемы с Git и .next директорией

Write-Host "=== Исправление проблемы с Git и .next ===" -ForegroundColor Green

# Шаг 1: Остановка всех Node.js процессов
Write-Host "`n1. Остановка Node.js процессов..." -ForegroundColor Yellow
$nodeProcesses = Get-Process | Where-Object {$_.ProcessName -eq "node"}
if ($nodeProcesses) {
    Write-Host "Найдено процессов Node.js: $($nodeProcesses.Count)" -ForegroundColor Yellow
    $nodeProcesses | ForEach-Object {
        Write-Host "Останавливаю процесс: $($_.ProcessName) (ID: $($_.Id))" -ForegroundColor Gray
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
    Write-Host "Node.js процессы остановлены" -ForegroundColor Green
} else {
    Write-Host "Node.js процессы не найдены" -ForegroundColor Gray
}

# Шаг 2: Переход в директорию проекта
$projectPath = "g:\Frontend\GitHub-Frontend\christmas-recipe-site"
if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "`n2. Переход в директорию проекта: $projectPath" -ForegroundColor Green
} else {
    Write-Host "`n2. Ошибка: Директория не найдена: $projectPath" -ForegroundColor Red
    exit 1
}

# Шаг 3: Проверка .gitignore
Write-Host "`n3. Проверка .gitignore..." -ForegroundColor Yellow
$gitignorePath = Join-Path $projectPath ".gitignore"
if (Test-Path $gitignorePath) {
    $gitignoreContent = Get-Content $gitignorePath -Raw
    if ($gitignoreContent -match "\.next") {
        Write-Host ".next уже в .gitignore" -ForegroundColor Green
    } else {
        Write-Host "Добавление .next в .gitignore..." -ForegroundColor Yellow
        Add-Content -Path $gitignorePath -Value "`n.next/"
        Write-Host ".next добавлен в .gitignore" -ForegroundColor Green
    }
} else {
    Write-Host "Создание .gitignore..." -ForegroundColor Yellow
    @"
node_modules
.next
dist
*.log
"@ | Out-File -FilePath $gitignorePath -Encoding utf8
    Write-Host ".gitignore создан" -ForegroundColor Green
}

# Шаг 4: Удаление блокирующего файла
Write-Host "`n4. Удаление блокирующих файлов..." -ForegroundColor Yellow
$lockFile = Join-Path $projectPath ".next\dev\lock"
if (Test-Path $lockFile) {
    try {
        Remove-Item -Path $lockFile -Force -ErrorAction Stop
        Write-Host "Файл блокировки удален" -ForegroundColor Green
    } catch {
        Write-Host "Не удалось удалить файл блокировки: $_" -ForegroundColor Red
        Write-Host "Попробуйте закрыть все программы и терминалы, затем повторите" -ForegroundColor Yellow
    }
} else {
    Write-Host "Файл блокировки не найден" -ForegroundColor Gray
}

# Шаг 5: Удаление .next из Git (если он отслеживается)
Write-Host "`n5. Проверка Git состояния..." -ForegroundColor Yellow
if (Test-Path ".git") {
    try {
        # Проверяем, отслеживается ли .next
        $gitStatus = git status --porcelain 2>&1
        if ($gitStatus -match "\.next") {
            Write-Host "Удаление .next из индекса Git..." -ForegroundColor Yellow
            git rm -r --cached .next 2>&1 | Out-Null
            Write-Host ".next удален из Git индекса" -ForegroundColor Green
        } else {
            Write-Host ".next не отслеживается Git" -ForegroundColor Green
        }
    } catch {
        Write-Host "Ошибка при работе с Git: $_" -ForegroundColor Red
    }
} else {
    Write-Host "Git репозиторий не найден в текущей директории" -ForegroundColor Yellow
}

# Шаг 6: Итоги
Write-Host "`n=== Готово! ===" -ForegroundColor Green
Write-Host "`nЧто дальше:" -ForegroundColor Yellow
Write-Host "1. Откройте GitHub Desktop" -ForegroundColor White
Write-Host "2. Проверьте раздел Changes - там не должно быть файлов из .next/" -ForegroundColor White
Write-Host "3. Если нужно, закоммитьте другие изменения" -ForegroundColor White
Write-Host "4. Не запускайте 'npm run dev' пока не закончите с Git" -ForegroundColor White
Write-Host "`nЕсли проблема осталась:" -ForegroundColor Yellow
Write-Host "- Закройте GitHub Desktop" -ForegroundColor White
Write-Host "- Закройте все терминалы" -ForegroundColor White
Write-Host "- Перезапустите GitHub Desktop" -ForegroundColor White

