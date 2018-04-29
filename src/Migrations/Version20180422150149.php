<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180422150149 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE coordinate_type (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE coordinate ADD coordinate_type_id INT NOT NULL');
        $this->addSql('ALTER TABLE coordinate ADD CONSTRAINT FK_CB9CBA17B71E4AC0 FOREIGN KEY (coordinate_type_id) REFERENCES coordinate_type (id)');
        $this->addSql('CREATE INDEX IDX_CB9CBA17B71E4AC0 ON coordinate (coordinate_type_id)');
        $this->addSql('ALTER TABLE coordinate ADD validated VARCHAR(225) NOT NULL');

    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE coordinate DROP FOREIGN KEY FK_CB9CBA17B71E4AC0');
        $this->addSql('DROP TABLE coordinate_type');
        $this->addSql('DROP INDEX IDX_CB9CBA17B71E4AC0 ON coordinate');
        $this->addSql('ALTER TABLE coordinate DROP coordinate_type_id');
    }
}
