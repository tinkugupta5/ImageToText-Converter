import React from 'react';

class FileUploader extends React.Component {
  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      console.log(content);
      // Here you can set the content to the state or pass it to some other components or logic
      // this.setState({ fileContent: content });
    };
    reader.readAsText(file);
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} />
        {/* Display file content or process further */}
      </div>
    );
  }
}

export default FileUploader;
