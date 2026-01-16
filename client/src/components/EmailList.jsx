import EmailCard from "./EmailCard";

export default function EmailList({ emails, onEmailUpdate }) {
   return (
      <div className="space-y-4">
         {emails.map((email) => (
            <EmailCard key={email._id} email={email} onUpdate={onEmailUpdate} />
         ))}
      </div>
   );
}
