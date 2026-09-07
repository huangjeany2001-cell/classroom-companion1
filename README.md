# 教室隨行簿

個人課堂管理網頁：學生名單、加減分、課堂點名、抽籤分組、平時考／定期評量登錄、Excel 匯出入。

## 使用方式

直接開啟 `index.html`，或部署到 Cloudflare Pages 後用網址開啟即可使用。

## 注意事項

- 資料會透過 `/api/data`（Cloudflare Pages Function）同步到共用的 Cloudflare KV 資料庫，任何裝置打開同一個網址看到的都是同一份資料（單一共用帳本，沒有分帳號登入）。
- 需要在 Cloudflare Pages 專案設定 → Functions → KV namespace bindings，綁定一個名稱為 `CLASSROOM_KV` 的 KV namespace，這個功能才會生效；未綁定時會自動退回瀏覽器本機（localStorage）模式。
- 目前這個網址沒有密碼保護，請不要外流網址。
- 仍建議定期使用畫面中的「匯出入 Excel」功能下載備份，作為第二層保險。

## 部署到 Cloudflare Pages 的額外設定（KV 資料庫）

1. Cloudflare Dashboard → Workers & Pages → KV → Create a namespace，取名例如 `classroom-companion-data`。
2. 回到您的 Pages 專案 → Settings → Functions → KV namespace bindings → Add binding：
   - Variable name：`CLASSROOM_KV`
   - KV namespace：選剛剛建立的那個
3. 儲存後重新部署（或推一次新的 commit 觸發自動部署）即可生效。

## 版本紀錄

請使用 git 紀錄每次修改，例如：

```
git add -A
git commit -m "說明這次改了什麼"
git push
```
 
