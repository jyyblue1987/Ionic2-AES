import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

/*
  Generated class for the Pdf page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

/*
	ionic plugin add cordova-plugin-file
	npm install --save @ionic-native/core
	npm install --save @ionic-native/file
	ionic plugin add cordova-plugin-file-opener2
	npm install --save @ionic-native/file-opener
*/
@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html',
  providers: [File, FileOpener]
})
export class PdfPage {

  	constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, private fileOpener: FileOpener, public alertCtrl: AlertController) {}

  	ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPage');
  	}

  	download(): void {
		// Remember to execute this after the onDeviceReady event

		// If your base64 string contains "data:application/pdf;base64,"" at the beginning, keep reading.
		var myBase64 = "JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G";
		// To define the type of the Blob
		var contentType = "application/pdf";
		// if cordova.file is not available use instead :
		// var folderpath = "file:///storage/emulated/0/";
		var folderpath = this.file.externalRootDirectory;
		// var folderpath = this.file.dataDirectory;
		var filename = "helloWorld.pdf";

		this.savebase64AsPDF(folderpath,filename,myBase64,contentType);
	}

	/**
	 * Convert a base64 string in a Blob according to the data and contentType.
	 * 
	 * @param b64Data {String} Pure base64 string without contentType
	 * @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
	 * @param sliceSize {Int} SliceSize to process the byteCharacters
	 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
	 * @return Blob
	*/
	b64toBlob(b64Data, contentType, sliceSize): any {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      	var blob = new Blob(byteArrays, {type: contentType});
      	return blob;
	}

	/**
	 * Create a PDF file according to its database64 content only.
	 * 
	 * @param folderpath {String} The folder where the file will be created
	 * @param filename {String} The name of the file that will be created
	 * @param content {Base64 String} Important : The content can't contain the following string (data:application/pdf;base64). Only the base64 string is expected.
	 */
	savebase64AsPDF(folderpath,filename,content,contentType): void {
	    // Convert the base64 string in a Blob
	    var dataBlob = this.b64toBlob(content, contentType, 512);
	    
	    console.log("Starting to write the file :3");

	    this.file.writeFile(folderpath, filename, dataBlob, {replace: true})
	    	.then( () => {
		    		console.log("write complete:");
		    		this.openPDF(folderpath + '/' + filename);
		    	}	    		
	      	).catch(
		        err => {
		          console.log("file create failed:",err);
		        }
	      	);    
		    	
	    
	  //   window.resolveLocalFileSystemURL(folderpath, function(dir) {
	  //       console.log("Access to the directory granted succesfully");
			// dir.getFile(filename, {create:true}, function(file) {
	  //           console.log("File created succesfully.");
	  //           file.createWriter(function(fileWriter) {
	  //               console.log("Writing content to file");
	  //               fileWriter.write(DataBlob);
	  //           }, function(){
	  //               alert('Unable to save file in path '+ folderpath);
	  //           });
			// });
	  //   });
	}

	openPDF(path: string): void {
		let prompt = this.alertCtrl.create({
	      title: 'Open PDF',
	      message: "Do you want to open this " + path,	     
	      buttons: [
	        {
	          text: 'Cancel',
	          handler: data => {
	            console.log('Cancel clicked');
	          }
	        },
	        {
	          text: 'Open',
	          handler: data => {
	            console.log('Open clicked');
	            this.fileOpener.open(path, 'application/pdf')
				  .then(() => console.log('File is opened'))
				  .catch(e => console.log('Error openening file', e));
	          }
	        }
	      ]
	    });
	    prompt.present();
		
	}

}
