use std::path::PathBuf;

#[tauri::command]
pub fn encode_image(image_path: PathBuf, message: String) -> Vec<u8> {
    Vec::new()
}
