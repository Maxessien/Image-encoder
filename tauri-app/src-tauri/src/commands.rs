#[tauri::command]
pub async fn encode_image(app: tauri::AppHandle, bytes: Vec<u8>) -> Result<(), String> {
    Ok(())
}
