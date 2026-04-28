#[tauri::command]
pub async fn save_image(app: tauri::AppHandle, bytes: Vec<u8>) -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub async fn list_image_files(app: tauri::AppHandle) -> Result<(), String> {
    Ok(())
}
