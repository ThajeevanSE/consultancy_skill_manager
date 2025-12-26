import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 

export const generateProjectPDF = (project, requirements, matches) => {
  const doc = new jsPDF();

  //Title & Header
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text("Project Staffing Report", 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  //Project Details Section
  doc.setDrawColor(0, 123, 255); 
  doc.setLineWidth(1);
  doc.line(14, 35, 196, 35);

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Project Name: ${project.name || 'Unknown Project'}`, 14, 45);
  doc.text(`Status: ${project.status || 'Active'}`, 14, 52);
  
  //Wrap description text
  const splitDesc = doc.splitTextToSize(`Description: ${project.description || 'N/A'}`, 180);
  doc.text(splitDesc, 14, 59);

  let finalY = 59 + (splitDesc.length * 5); 

  //Requirements Table
  doc.text("Required Skills", 14, finalY + 10);
  
  const reqRows = requirements.map(req => [req.name, req.min_proficiency_level]);
  
  //Call autoTable as a function, passing 'doc' as the first argument
  autoTable(doc, {
    startY: finalY + 15,
    head: [['Skill Name', 'Min Level Required']],
    body: reqRows,
    theme: 'grid',
    headStyles: { fillColor: [66, 66, 66] }
  });

  //Matches Table
  let matchY = doc.lastAutoTable.finalY + 15;
  
  doc.text("Recommended Team Members", 14, matchY);

  const matchRows = matches.map(p => {
    // Format skills list
    const skillSummary = Object.entries(p.skills)
      .map(([id, level]) => level) 
      .join(', ');
      
    return [p.name, p.role, p.email, skillSummary]; 
  });

  if (matches.length > 0) {

    autoTable(doc, {
      startY: matchY + 5,
      head: [['Name', 'Role', 'Email', 'Skills']], 
      body: matchRows,
      theme: 'striped',
      headStyles: { fillColor: [40, 167, 69] } 
    });
  } else {
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("No perfect matches found. See Gap Analysis below.", 14, matchY + 10);
  }

  //Save
  doc.save(`${project.name ? project.name.replace(/\s+/g, '_') : 'project'}_report.pdf`);
};