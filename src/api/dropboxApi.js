import Dropbox from 'dropbox';
const accessToken =
	'sl.Bd8p58g7K8jcoHWOZ8nLZZ5S8B2rc2HCmH48i0vfNouV4p2OPDSvep2I1re4oXXC11HGFVh3ThpNqTNvjLuP36HI4NY3AdJLhwPlctBS9SsvMFt5yEdgoGB2KmFCEG1UWaXOIIc';
const dbx = new Dropbox({ accessToken, fetch });
export const uploadFile = async (file, folderPath) => {
	try {
		const response = await dbx.filesUpload({
			path: `${folderPath}/${file.name}`,
			contents: file,
		});
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
}; // Add other Dropbox API functions as needed...
