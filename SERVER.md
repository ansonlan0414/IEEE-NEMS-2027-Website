# 伺服器部署說明

## 主機資訊

| 項目 | 資訊 |
|------|------|
| 主機名稱 | DESKTOP-H6LGN24（ylwang lab） |
| IP 位址 | 140.114.126.97（清大校園網路，公開 IP） |
| 作業系統 | Windows 10 / IIS 10.0 |
| SSH 使用者 | `ylwang lab` |
| SSH 設定檔 | `C:\Users\z9010\.ssh\config`（Host 別名 `ylwang_lab`） |

## 連線方式

```bash
# 使用 SSH config 別名連線
ssh ylwang_lab

# 或完整指令
ssh "ylwang lab"@140.114.126.97
```

## 網站部署路徑

| 網站 | IIS 站台名稱 | 路徑 | Port |
|------|-------------|------|------|
| 實驗室網站（原有） | Default Web Site | `C:\inetpub\wwwroot` | 80 |
| IEEE NEMS 2027 | IEEE-NEMS-2027 | `C:\inetpub\ieeenems2027` | 8080（測試用，待切換至 80） |

## 目前存取方式

- **測試網址：** http://140.114.126.97:8080
- **正式網域：** http://ieeenems2027.com（DNS 設定後生效）

## 檔案上傳方式

```bash
# 上傳整個網站（從本機專案目錄）
scp -r D:/IEEEmemswebsite/index.html D:/IEEEmemswebsite/assets D:/IEEEmemswebsite/pages D:/IEEEmemswebsite/web.config "ylwang_lab:C:\inetpub\ieeenems2027\"

# 上傳單一檔案
scp D:/IEEEmemswebsite/index.html "ylwang_lab:C:\inetpub\ieeenems2027\index.html"

# 上傳單一子頁面
scp D:/IEEEmemswebsite/pages/venue.html "ylwang_lab:C:\inetpub\ieeenems2027\pages\venue.html"
```

## IIS 管理指令

透過 SSH 在遠端執行 PowerShell：

```bash
# 查看所有網站狀態
ssh ylwang_lab "powershell -Command \"Get-Website | Format-Table Name,State,PhysicalPath,Bindings\""

# 重啟 NEMS 網站
ssh ylwang_lab "powershell -Command \"Stop-Website -Name 'IEEE-NEMS-2027'; Start-Website -Name 'IEEE-NEMS-2027'\""

# 查看網站綁定
ssh ylwang_lab "powershell -Command \"Get-WebBinding -Name 'IEEE-NEMS-2027'\""
```

## 安全設定

已透過 `web.config` 設定以下安全標頭：

| 標頭 | 用途 |
|------|------|
| X-Frame-Options: SAMEORIGIN | 防止點擊劫持 |
| X-Content-Type-Options: nosniff | 防止 MIME 嗅探 |
| X-XSS-Protection: 1; mode=block | XSS 防護 |
| Content-Security-Policy | 限制資源來源 |
| Referrer-Policy | 控制 referrer 洩露 |
| 移除 X-Powered-By | 隱藏伺服器技術 |
| 封鎖 PUT/DELETE/TRACE | 僅允許 GET/HEAD |

安全設定檔位置：`C:\inetpub\ieeenems2027\web.config`

## DNS 設定完成後的待辦事項

1. **切換到 port 80 + 域名綁定**（讓兩個網站共用 port 80）：
   ```bash
   ssh ylwang_lab "powershell -Command \"
     Set-WebBinding -Name 'IEEE-NEMS-2027' -BindingInformation '*:8080:' -PropertyName Port -Value 80
     Set-WebBinding -Name 'IEEE-NEMS-2027' -BindingInformation '*:80:' -PropertyName HostHeader -Value 'ieeenems2027.com'
   \""
   ```

2. **移除測試用防火牆規則**：
   ```bash
   ssh ylwang_lab "powershell -Command \"Remove-NetFirewallRule -DisplayName 'IEEE-NEMS-2027 HTTP 8080'\""
   ```

3. **設定 HTTPS (SSL)**：使用 Let's Encrypt 免費憑證或 Cloudflare 代理

## 注意事項

- 此主機同時提供實驗室網站服務，操作時請勿影響 `C:\inetpub\wwwroot` 目錄
- 140.114.126.97 為清大公開 IP，port 80 已確認外部可連入
- Port 8080 為暫時測試用，已開放 Windows 防火牆規則 `IEEE-NEMS-2027 HTTP 8080`
